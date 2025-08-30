require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/admin/sidekiq"

  namespace :v1 do
    resources :facilities, only: [:index, :show]

    resources :courts, only: [:index, :show]

    resources :sessions do
        post :stop, on: :member
        get  :presigned_download, on: :member
    end

    resources :recorders, only: [] do
      collection do
        post :heartbeat
        post :webhook # recorder events: started, segement_uploaded, clip_upload
      end
    end
  end
end
