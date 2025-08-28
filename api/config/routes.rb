require 'sidekiq/web'

Rails.application.routes.draw do
  get "sessions/create"
  get "sessions/stop"
  get "sessions/show"
  get "sessions/presigned_download"
  mount Sidekiq::Web => "/admin/sidekiq"
  namespace :v1 do
    resources :facilities, only: [:index, :show]
    resources :courts, only: [:index, :show]
    resources :sessions, only: [:show, :create, :update] do
      member do
        post :stop
        get :presigned_download
      end
    end
    resources :recorders, only: [] do
      collections do
        post :heartbeat
        post :webhook # recorder events: started, segement_uploaded, clip_upload
      end
    end
  end
end
