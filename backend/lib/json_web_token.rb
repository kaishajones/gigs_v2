# This handles encoding and decoding of Json Web Tokens
class JsonWebToken
  SECRET_KEY =  Rails.application.secrets.secret_key_base. to_s

# we are encoding the user data and adding an expiring time
# encode the user data with secret key
# when decode we are grabbing the first part of the information
# return the decoded information as an object(hash)

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

end