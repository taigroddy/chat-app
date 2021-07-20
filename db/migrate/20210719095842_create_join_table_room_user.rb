class CreateJoinTableRoomUser < ActiveRecord::Migration[6.1]
  def change
    create_join_table :rooms, :users do |t|
      t.index [:room_id, :user_id], unique: true
      t.index [:user_id, :room_id], unique: true
    end
  end
end
