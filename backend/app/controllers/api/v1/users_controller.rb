module Api::V1
  class UsersController < ApplicationController
    # We skip verify authenticity token since we are trying to build rails API
    # Alternatively we can also create the rails project as an API using
    # rails new gigs -api
    skip_before_action :verify_authenticity_token
    before_action :authorize_request, except: %i[create login]

    # allows us to create a new user and return the data as JSON
    # the create end point will be used for the register component on the client side
    
    def create
      @user = User.create(user_params)
      if @user.save
        render json: @user, status: :created
      end
    end


    # Allows us login a registered user and get a token
    # the token is what we would use for authorization and it
    # would be stored in localstorage on the frontend

    def login
      user = User.find_by(email: params[:email])
      user = user.authenticate(params[:password])
      render json: {
        token: JsonWebToken.encode(user_id: user.id), 
        user: user
      }
    end

    # This shows a user information. This comes in handy
    # For our profile screen on the frontend

    def show
      render json: @current_user, status: :ok
    end

    # This allows us update a user information. The update profile screen
    # makes use of this action

    def update
      if @current_user.update(user_params)
        render json: @current_user, status: :ok
      end
    end

    private 
    # Private methods that permits user attributes
    def user_params
      params.permit(
        :firstname, 
        :lastname,
        :email,
        :password,
        :address,
        :profile_photo,
        :username

      )
    end
  end
end