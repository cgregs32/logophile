class Api::MembershipsController < ApiController
  before_action :require_login

  def create
    membership = current_user.memberships.new(membership_params)
    if membership.save
      render json: membership
    else
      render json: { errors: membership.full_messages }, status: 422
    end
  end

  private
    def membership_params
      params.require(:membership).permit(:user_id, :club_id)
    end

end
