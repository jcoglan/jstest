require 'json'

class Formatter
  METHODS = %w[start close stop start_dump dump_pending dump_failures dump_summary]
  METHODS.each { |m| define_method(m) { |*a| } }

  def initialize(out)
    @output    = out
    @event_id  = 0
    @passed    = true
    @tests     = 0
    @failures  = 0
    @errors    = 0
  end

  def message(message)
  end

  def current_state
    {
      'passed'     => @passed,
      'tests'      => @tests,
      'assertions' => @tests,
      'failures'   => @failures,
      'errors'     => @errors
    }
  end

  def write(type, event)
    event['eventId'] = @event_id
    event['timestamp'] = (Time.now.to_f * 1000).floor
    @event_id += 1
    @output.puts(JSON.dump('jstest' => [type, event]))
  end

  def start(size)
    @size = size
    write('startSuite', 'size' => size)
  end

  def group_data(group)
    data = group.metadata[:example_group]
    name = data[:description_args].first
    {'fullName' => name}
  end

  def example_group_started(group)
    write('startContext', group_data(group))
  end

  def example_group_finished(group)
    write('endContext', group_data(group))
    update
  end

  def example_data(example)
    data    = example.metadata
    context = data[:example_group][:description_args]
    name    = data[:description_args].first
    {
      'fullName'  => (context + [name]) * ' ',
      'shortName' => name,
      'context'   => context
    }
  end

  def example_started(example)
    @example = example
    write('startTest', example_data(example))
  end

  def example_passed(example)
    update
    write('endTest', example_data(example))
  end

  def example_failed(example)
    error = example.metadata[:execution_result][:exception]
    write('addFault',
          'test'  => example_data(example),
          'error' => error_data(error))

    if failure?(error)
      @failures += 1
    else
      @errors += 1
    end
    update
    write('endTest', example_data(example))
  end

  def failure?(error)
    error.is_a?(RSpec::Expectations::ExpectationNotMetError)
  end

  def error_data(error)
    {
      'type'      => failure?(error) ? 'failure' : 'error',
      'message'   => error.message,
      'backtrace' => failure?(error) ? '' : error.backtrace
    }
  end

  def update
    if @done
      write('endSuite', current_state)
    else
      @tests += 1
      @done = true if @tests == @size
      write('update', current_state)
    end
  end
end

