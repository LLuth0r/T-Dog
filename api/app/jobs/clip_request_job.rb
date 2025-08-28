class ClipRequestJob < ApplicationJob
  queue_as :default

  def perform(session_id)
    s = Session.find(session_id)
    # Send command to recorder service (HTTP) to clip this window
    RecorderClient.clip(session: s)
  end
end