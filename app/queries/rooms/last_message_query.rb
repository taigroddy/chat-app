module Rooms
  ##
  # Rooms::LastMessageQuery
  ##
  class LastMessageQuery
    class << self
      delegate :call, to: :new
    end

    def call(user_id)
      @user_id = user_id

      Room.find_by_sql(build_query)
    end

    private

    def build_query
      <<~SQL.squish.tr('"', "'")
        SELECT rooms.*, tbl_messages.content as last_message, IFNULL(tbl_messages.created_at, rooms.created_at) as sent_at
        FROM rooms#{' '}
        INNER JOIN rooms_users ON rooms.id = rooms_users.room_id#{' '}
        LEFT OUTER JOIN (
          SELECT messages.*#{' '}
          FROM messages#{' '}
          WHERE (messages.created_at, room_id) IN (
            SELECT max(created_at) , room_id
              FROM messages messages
              GROUP BY room_id
            )
          ) as tbl_messages ON rooms.id = tbl_messages.room_id
        WHERE rooms_users.user_id = #{@user_id}
        GROUP BY rooms.id
        ORDER BY sent_at DESC
      SQL
    end
  end
end
