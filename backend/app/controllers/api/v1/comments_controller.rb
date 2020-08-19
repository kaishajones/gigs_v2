module Api::V1
  class CommentsController < ApplicationController
    # We skip verify authenticity token since we are trying to build rails API
    # Alternatively we can also create the rails project as an API using
    # rails new gigs -api
  
    skip_before_action :verify_authenticity_token

    # We need to ensure that the user is authenticated and authorized before
    # making any requests

    before_action :authorize_request
    
    # This creates comments for an article
    def create
      @article = Article.where(id: params[:article_id]).first
      if @article.comments.create(comments_params)
        render json: @article.comments, include: {article: {include: :user}}, status: :ok
      end
    end
    
    # This display one comment by passing in the article id and comment id
    def show
      @article = Article.where(id: params[:article_id]).first
      @comment = @article.comments.where(id: params[:id]).first
      render json: @comment, include: {article: {include: :user}}
    end

    # This gets all comments for an article
    def index
      @article = Article.where(id: params[:article_id]).first
      @comments = @article.comments
      render json: @comments, include: {article: {include: :user}}
    end

    private 
    # Private methods that permits comment attributes
      def comments_params
        params.permit(
          :content, 
          :user_id,
          :article_id
        )
      end
 end
  
 
end
