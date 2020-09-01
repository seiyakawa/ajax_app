class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")  #メモの順番を降順
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end