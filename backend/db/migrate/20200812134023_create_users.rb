class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :profile_photo
      t.text :address
      t.string :password_digest
      t.string :username
      t.timestamps
    end
  end
end
