class Club < ApplicationRecord
  validates_presence_of :name

  has_many :announcements, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_many :readings, dependent: :destroy
  has_many :books, through: :readings

  def self.find_user_clubs(user_id)
    select("clubs.id, clubs.name, memberships.is_moderator")
    .joins("INNER JOIN memberships ON clubs.id = memberships.club_id")
    .joins("INNER JOIN users ON memberships.user_id = users.id")
    .where("users.id = #{user_id}")
  end
end
