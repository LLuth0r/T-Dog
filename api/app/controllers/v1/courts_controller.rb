module V1 
  class CourtsController < ApplicationController
    def index
      if params[:slug].present?
        render json: Court.includes(:camera).where(slug: params[:slug]).map { |c| 
          { id: c.id, name: c.name, slug: c.slug, facility_id: c.facility_id,
          camera: c.camera&.slice(:id, :rtsp_url, :onvif_url, :make, :model) }
        }
      else
        render json: Court.limit(50).pluck(:id, :name, :slug)
      end
    end

    def show
      c = Court.find(params[:id])
      render json: c.as_json(include: :camera)
    end
  end
end
