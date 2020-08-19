module Api::V1
  class ArticlesController < ApplicationController
    # We skip verify authenticity token since we are trying to build rails API
    # we can also create the rails project as an API using
    # rails new gigs -api
    skip_before_action :verify_authenticity_token


    # We need to ensure that the user is authenticated and authorized before
    # making any requests
    before_action :authorize_request

     # This creates an article. This allow a user to create an article
    def create 
      @article = @current_user.articles.create(article_params)
      render json: @article, include: :user, status: :created
    end

    # This display an article by passing the id of that article

    def show
      @article = Article.where(id: params[:id]).first
      render json: @article, include: :user, status: :ok
    end

    # This list all the articles created on the articleList component
    # on the frontend.

    def index
      @articles = Article.all
      render json: @articles, include: [:user, { comments: { include: :user } }], status: :ok
    end

    # This updates an already created article by passing the article id
    def update
      @article = @current_user.articles.find(params[:id])
      @article.update(article_params)
      render json: @article, include: [:user, { comments: { include: :user } }], status: :ok
    end

    # This deletes an article by passing in the article id
    # and calling the delete method
    def destroy
      @article = @current_user.articles.find(params[:id])
      @article.destroy
      render json: @current_user.articles, include: [:user, { comments: { include: :user } }], status: :ok
    end

    # Private methods that permits article attributes
    private
    def article_params
      params.permit(
        :title, 
        :content,
        :user_id,
        :id
      )
    end
  end
end