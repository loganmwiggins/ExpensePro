import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { Expense } from '../../../models/expense.model';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-edit-expense',
    standalone: true,
    imports: [ 
        CommonModule, 
        RouterModule, 
        HttpClientModule, 
        FormsModule, 
        ReactiveFormsModule 
    ],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.css'
})

export class EditExpenseComponent {
    
    userId!: string;
    expenseId!: string | null;
    expense$!: Observable<Expense>;

    // Dropdown booleans
    iconDropdownOpen = false;
    mpdDropdownOpen = false;
    ypdmDropdownOpen = false;
    ypddDropdownOpen = false;

    tempYearlyPd = "";
    tempMonthlyPdNum = "";
    tempYearlyPdNum = "";

    iconsFinance = [
        { path: "/assets/icons/expense-icons/usd-circle.svg", name: "Default" },
        { path: "/assets/icons/expense-icons/coins.svg", name: "Coins" },
        { path: "/assets/icons/expense-icons/credit-card.svg", name: "Credit Card" },
        { path: "/assets/icons/expense-icons/dollar-bill.svg", name: "Dollar Bill" },
        { path: "/assets/icons/expense-icons/bank.svg", name: "Bank" },
        { path: "/assets/icons/expense-icons/piggy-bank.svg", name: "Piggy Bank" },
        { path: "/assets/icons/expense-icons/chart-histogram.svg", name: "Histogram Chart" },
        { path: "/assets/icons/expense-icons/money-bag.svg", name: "Money Bag" },
        { path: "/assets/icons/expense-icons/marketplace.svg", name: "Marketplace" },
        { path: "/assets/icons/expense-icons/shopping-cart.svg", name: "Shopping Cart" },
        { path: "/assets/icons/expense-icons/shopping-bag.svg", name: "Shopping Bag" },
        { path: "/assets/icons/expense-icons/tags.svg", name: "Tags" }
    ];

    iconsPersonal = [
        { path: "/assets/icons/expense-icons/house.svg", name: "House" },
        { path: "/assets/icons/expense-icons/briefcase.svg", name: "Briefcase" },
        { path: "/assets/icons/expense-icons/car.svg", name: "Car" },
        { path: "/assets/icons/expense-icons/gas-pump.svg", name: "Gas Pump" },
        { path: "/assets/icons/expense-icons/groceries.svg", name: "Groceries" },
        { path: "/assets/icons/expense-icons/fork-and-knife.svg", name: "Fork and Knife" },
        { path: "/assets/icons/expense-icons/coffee-mug.svg", name: "Coffee Mug" },
        { path: "/assets/icons/expense-icons/gym.svg", name: "Gym" },
        { path: "/assets/icons/expense-icons/paw.svg", name: "Pet" },
        { path: "/assets/icons/expense-icons/baby.svg", name: "Baby" },
        { path: "/assets/icons/expense-icons/hospital.svg", name: "Hospital" },
        { path: "/assets/icons/expense-icons/stethoscope.svg", name: "Stethoscope" },
        { path: "/assets/icons/expense-icons/pills.svg", name: "Pills/Meds" },
        { path: "/assets/icons/expense-icons/tooth.svg", name: "Tooth" },
        { path: "/assets/icons/expense-icons/bolt.svg", name: "Bolt" },
        { path: "/assets/icons/expense-icons/bulb.svg", name: "Bulb" },
        { path: "/assets/icons/expense-icons/raindrops.svg", name: "Raindrops" },
        { path: "/assets/icons/expense-icons/faucet.svg", name: "Faucet" },
        { path: "/assets/icons/expense-icons/broom.svg", name: "Broom" },
        { path: "/assets/icons/expense-icons/graduation-cap.svg", name: "Graduation Cap" },
        { path: "/assets/icons/expense-icons/book.svg", name: "Book" },
        { path: "/assets/icons/expense-icons/plane.svg", name: "Plane" }
    ];

    iconsEntertainment = [
        { path: "/assets/icons/expense-icons/music-note.svg", name: "Music" },
        { path: "/assets/icons/expense-icons/tv-retro.svg", name: "TV Retro" },
        { path: "/assets/icons/expense-icons/clapperboard.svg", name: "Clapperboard" },
        { path: "/assets/icons/expense-icons/gamepad.svg", name: "Game Controller" },
        { path: "/assets/icons/expense-icons/joystick.svg", name: "Joystick" },
        { path: "/assets/icons/expense-icons/microphone.svg", name: "Microphone" },
        { path: "/assets/icons/expense-icons/ticket.svg", name: "Ticket" },
        { path: "/assets/icons/expense-icons/golf-club.svg", name: "Golf Club" }
    ];

    iconsTech = [
        { path: "/assets/icons/expense-icons/computer.svg", name: "Computer" },
        { path: "/assets/icons/expense-icons/laptop.svg", name: "Laptop" },
        { path: "/assets/icons/expense-icons/mobile-phone.svg", name: "Mobile Phone" },
        { path: "/assets/icons/expense-icons/tv.svg", name: "TV" },
        { path: "/assets/icons/expense-icons/wifi.svg", name: "Wifi" },
        { path: "/assets/icons/expense-icons/cloud.svg", name: "Cloud" },
        { path: "/assets/icons/expense-icons/plug-cable.svg", name: "Plug Cable" },
        { path: "/assets/icons/expense-icons/camera.svg", name: "Camera" },
        { path: "/assets/icons/expense-icons/phone-call.svg", name: "Phone Call" },
        { path: "/assets/icons/expense-icons/internet.svg", name: "Internet" }
    ];

    iconsOther = [
        { path: "/assets/icons/expense-icons/star.svg", name: "Star" },
        { path: "/assets/icons/expense-icons/sparkles.svg", name: "Sparkles" },
        { path: "/assets/icons/expense-icons/heart.svg", name: "Heart" },
        { path: "/assets/icons/expense-icons/fire.svg", name: "Fire" },
        { path: "/assets/icons/expense-icons/diamond.svg", name: "Diamond" },
        { path: "/assets/icons/expense-icons/heat.svg", name: "Heat" },
        { path: "/assets/icons/expense-icons/shield.svg", name: "Shield" },
        { path: "/assets/icons/expense-icons/lock.svg", name: "Lock" },
        { path: "/assets/icons/expense-icons/world.svg", name: "World" },
        { path: "/assets/icons/expense-icons/gear.svg", name: "Gear" },
        { path: "/assets/icons/expense-icons/gift.svg", name: "Gift" },
        { path: "/assets/icons/expense-icons/handshake.svg", name: "Handshake" }
    ];

    daysOfMonth = [
        { name: "1st", abbr: "1", value: "01" },
        { name: "2nd", abbr: "2", value: "02" },
        { name: "3rd", abbr: "3", value: "03" },
        { name: "4th", abbr: "4", value: "04" },
        { name: "5th", abbr: "5", value: "05" },
        { name: "6th", abbr: "6", value: "06" },
        { name: "7th", abbr: "7", value: "07" },
        { name: "8th", abbr: "8", value: "08" },
        { name: "9th", abbr: "9", value: "09" },
        { name: "10th", abbr: "10", value: "10" },
        { name: "11th", abbr: "11", value: "11" },
        { name: "12th", abbr: "12", value: "12" },
        { name: "13th", abbr: "13", value: "13" },
        { name: "14th", abbr: "14", value: "14" },
        { name: "15th", abbr: "15", value: "15" },
        { name: "16th", abbr: "16", value: "16" },
        { name: "17th", abbr: "17", value: "17" },
        { name: "18th", abbr: "18", value: "18" },
        { name: "19th", abbr: "19", value: "19" },
        { name: "20th", abbr: "20", value: "20" },
        { name: "21st", abbr: "21", value: "21" },
        { name: "22nd", abbr: "22", value: "22" },
        { name: "23rd", abbr: "23", value: "23" },
        { name: "24th", abbr: "24", value: "24" },
        { name: "25th", abbr: "25", value: "25" },
        { name: "26th", abbr: "26", value: "26" },
        { name: "27th", abbr: "27", value: "27" },
        { name: "28th", abbr: "28", value: "28" },
        { name: "29th", abbr: "29", value: "29" },
        { name: "30th", abbr: "30", value: "30" },
        { name: "31st", abbr: "31", value: "31" },
    ];

    months = [
        { name: "January", abbr: "Jan", value: "01" },
        { name: "February", abbr: "Feb", value: "02" },
        { name: "March", abbr: "Mar", value: "03" },
        { name: "April", abbr: "Apr", value: "04" },
        { name: "May", abbr: "May", value: "05" },
        { name: "June", abbr: "Jun", value: "06" },
        { name: "July", abbr: "Jul", value: "07" },
        { name: "August", abbr: "Aug", value: "08" },
        { name: "September", abbr: "Sep", value: "09" },
        { name: "October", abbr: "Oct", value: "10" },
        { name: "November", abbr: "Nov", value: "11" },
        { name: "December", abbr: "Dec", value: "12" }
    ];

    editExpenseForm = new FormGroup({
        name: new FormControl<string>(""),
        type: new FormControl<string>(""),
        icon: new FormControl<string>("/assets/icons/expense-icons/usd-circle.svg"),
        cost: new FormControl<number>(0),
        paymentDate: new FormControl<string>(""),
        paymentDateNum: new FormControl<string>(""),
        category: new FormControl<string>("")
    });

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private userStore: UserStoreService,
        private toast: NgToastService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.expenseId = id;

        if (id !== null) { this.loadExpense(id); }

        // Get current user ID
        this.userStore.getUserIdFromStore()
            .subscribe(val => {
                const userIdFromToken = this.auth.getUserIdFromToken();
                this.userId = val || userIdFromToken;
            })
    }

    private getExpenseById(id: string): Observable<Expense> {
        return this.http.get<Expense>(`https://localhost:7265/api/Expenses/${id}`);
    }

    private loadExpense(id: string): void {
        this.expense$ = this.getExpenseById(id);

        // Fill expense form with retrieved observable data
        this.expense$.subscribe(expense => {
            this.editExpenseForm.patchValue({
                name: expense.name,
                type: expense.type,
                icon: expense.icon,
                cost: expense.cost,
                paymentDate: expense.paymentDate,
                category: expense.category
            });
        });
    }

    closeAllDropdowns(): void {
        this.iconDropdownOpen = false;
        this.mpdDropdownOpen = false;
        this.ypdmDropdownOpen = false;
        this.ypddDropdownOpen = false;
    }

    toggleIconDropdown(): void {
        this.iconDropdownOpen = !this.iconDropdownOpen;
        this.mpdDropdownOpen = false;
        this.ypdmDropdownOpen = false;
        this.ypddDropdownOpen = false;
    }
    selectIcon(icon: { path: string; name: string }): void {
        this.editExpenseForm.get('icon')?.setValue(icon.path);
        this.iconDropdownOpen = false;
    }

    toggleDateDropdown(): void {
        this.iconDropdownOpen = false;

        if (this.editExpenseForm.value.type == "") {
            this.toast.warning("Please select a Type before choosing a Payment Date.", "", 5000);
        }
        else if (this.editExpenseForm.value.type == "Monthly") {
            this.mpdDropdownOpen = !this.mpdDropdownOpen;
        }
        else if (this.editExpenseForm.value.type == "Yearly") {
            this.ypdmDropdownOpen = !this.ypdmDropdownOpen;
        }
    }

    // Choose monthly payment date
    selectMonthlyDate(day: { name: string; abbr: string; value: string; }): void {
        this.editExpenseForm.get('paymentDate')?.setValue(day.name);

        this.tempMonthlyPdNum = "00-" + day.value;
        this.editExpenseForm.get('paymentDateNum')?.setValue(this.tempMonthlyPdNum);

        this.mpdDropdownOpen = false;
    }

    // Choose yearly payment date
    selectYearlyMonth(month: { name: string; abbr: string; value: string; }): void {
        this.tempYearlyPd = month.abbr;
        this.tempYearlyPdNum = month.value + "-";

        this.ypdmDropdownOpen = false;
        this.ypddDropdownOpen = true;
    }
    selectYearlyDay(day: { name: string; abbr: string; value: string; }): void {
        this.tempYearlyPd += " " + day.abbr;
        this.editExpenseForm.get('paymentDate')?.setValue(this.tempYearlyPd);

        this.tempYearlyPdNum += day.value;
        this.editExpenseForm.get('paymentDateNum')?.setValue(this.tempYearlyPdNum);

        this.ypddDropdownOpen = false;
    }

    updateExpense(): void {
        // What to do if form is not valid
        if (
            this.editExpenseForm.value.icon == null
            || this.editExpenseForm.value.name == null || this.editExpenseForm.value.name == ""
            || this.editExpenseForm.value.type == null || this.editExpenseForm.value.type == ""
            || this.editExpenseForm.value.cost == null || this.editExpenseForm.value.cost == 0
            || this.editExpenseForm.value.category == null || this.editExpenseForm.value.category == ""
        ) {
            this.toast.warning("Icon, Name, Type, Cost, and Category fields are required.", "", 5000);
            return;
        }

        // If expenseId is not null/empty
        if (this.expenseId) {
            // Edit existing expense
            const updatedExpense = this.editExpenseForm.value;

            this.http.put(`https://localhost:7265/api/Expenses/${this.expenseId}`, updatedExpense)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/']); // Redirect to the dashboard
                        this.toast.success("Expense updated successfully.", "SUCCESS", 5000);
                    },
                    error: (error) => {
                        this.toast.danger("Error updating expense.", "ERROR", 5000);
                    }
                });
        } else {
            // Add new expense
            const newExpense = { ...this.editExpenseForm.value, UserId: this.userId };

            this.http.post(`https://localhost:7265/api/Expenses`, newExpense)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/']); // Redirect to the dashboard
                        this.toast.success("Expense added successfully.", "SUCCESS", 5000);
                    },
                    error: (error) => {
                        this.toast.danger("Error adding expense.", "ERROR", 5000);
                    }
                });
        }
    }

    // [HttpDelete]
    deleteExpense() {
        if (window.confirm("Are you sure you want to delete this expense?")) {  //Confirmation request
            this.http.delete(`https://localhost:7265/api/Expenses/${this.expenseId}`)
              .subscribe({
                  // Will only run when we get a success response from API
                  next: (response) => {
                    this.router.navigate(['/']); // Redirect to the dashboard
                    this.toast.success("Expense deleted successfully.", "SUCCESS", 5000);
                    this.ngOnInit();
                  }
              });
        }
    }
}