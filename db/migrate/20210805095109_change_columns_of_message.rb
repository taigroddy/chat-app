class ChangeColumnsOfMessage < ActiveRecord::Migration[6.1]
  def change
    remove_column :messages, :content
    add_column :messages, :content_encrypted, :string
  end
end
