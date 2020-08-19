class ApplicationController < ActionController::Base

  # we are getting the auth token from the client side 
  # we are extracting the token info by splitting the auth token 
  # returns an array of two strings
  # 'I am kaisha'.split(' ') => ['I', 'am', 'Kaisha'].last => 'Kaisha'
  # e.g. Bearer xxxxxx(we are trying to get xxxx out of Bearer xxxx) 
  # header is data that is being sent with every request in this case it will be a token
  # we first check if the user is authorized to make the request
  # get the payload by decoding the header
  # payload(@decoded) should contain the user id info
  # find the user that corresponds to the to the payload user id 
  # setting rescue methods incase there are errors so app wont crash/break
  # First Rescue: catches any errors that may occur when user is not found
  # Second Rescue: catches any errors that may occur while decoding 
  # encode from an id to a token 
  # decode from a token back to an id

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => error
      render json: {errors: error.message}, status: :unauthorized
    rescue JWT::DecodeError => error
      render json: {errors: error.message}, status: :unauthorized
    end
  end





  

end
