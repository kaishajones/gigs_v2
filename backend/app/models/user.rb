class User < ApplicationRecord
  has_many :articles
  has_many :comments, dependent: :destroy
  
  # manage secure password
  # rails helper method
  has_secure_password 

  # adding validation 
  validates :email, presence: true, uniqueness: true
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }

  #ensures that the email is valid            
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }            
  
  before_create :set_profile_photo
  
  def set_profile_photo
    self.profile_photo = generate_photo
  end

  def generate_photo
    if email.include?('kaisha')
      'https://avatars2.githubusercontent.com/u/12019320?s=460&u=d0e2bdf1be105ea016322ed761da2e195a8d3217&v=4'
    else
      photo = [
        'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        'https://www.nicepng.com/png/detail/209-2099655_anime-avatar-png-avatar-gamer.png',
        'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png'
      ]

      photo.sample
    end
  end
end
