class SessionsController < ApplicationController
  def new
  end

  def create
    officer = Officer.find_by(username: params[:username])
    if officer && officer.authenticate(params[:password])
      ### successful login
      session[:officer_id] = officer.id
      redirect_to home_path, notice: "Logged in!"
    else
      ### failed login
      flash.now[:alert] = "Username and/or password is invalid"
      render :new
    end
  end

  def destroy
    session[:officer_id] = nil
    ### logout redirects to home_path
    redirect_to home_path, notice: "Logged out!"

  end
end
