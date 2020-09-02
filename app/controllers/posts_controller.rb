class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")  #メモの順番を降順
  end

  def create
    post = Post.create(content: params[:content], checked: false) #メモ作成時に未読の情報を保存するようにした
    render json:{ post: post }　#レスポンスをjsonに変更した
  end

  def checked
    post = Post.find(params[:id])
    if post.checked 
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end

end