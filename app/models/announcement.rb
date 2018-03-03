class Announcement < ApplicationRecord
  validates_presence_of :title, :content

  belongs_to :club

end
