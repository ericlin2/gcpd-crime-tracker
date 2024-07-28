class OfficersController < ApplicationController
  before_action :set_officer, only: [:show, :edit, :update, :destroy]
  before_action :check_login
  authorize_resource

  def index
    @active_officers = Officer.where(active: true).alphabetical.paginate(page: params[:page]).per_page(15)
    @inactive_officers = Officer.where(active: false).paginate(page: params[:page]).per_page(10)
  end

  def new
    @officer = Officer.new
  end

  def create
    @officer = Officer.new(officer_params)
    if @officer.save
      flash[:notice] = "Successfully created #{@officer.proper_name}."
      redirect_to officer_path(@officer)
    else
      render :new
    end
  end

  def show
    @current_assignments = @officer.assignments.where('end_date IS NULL OR end_date > ?', Date.today)
    @past_assignments = @officer.assignments.where('end_date <= ?', Date.today)
  end

  def edit
  end

  def update
    if @officer.update(officer_params)
      # successful update
      redirect_to officer_path(@officer)
    else
      # failed update
      render :edit
    end
  end

  def destroy
    if @officer.assignments.any?
      render :show
    else
      @officer.destroy
      flash[:notice] = "Removed #{@officer.proper_name} from the system."
      redirect_to officers_path
    end
  end

  private
  def set_officer
    @officer = Officer.find(params[:id])
  end

  def officer_params
    params.require(:officer).permit(:active, :ssn, :rank, :first_name, :last_name, :unit_id, :username, :role, :password, :password_confirmation)
  end
end
