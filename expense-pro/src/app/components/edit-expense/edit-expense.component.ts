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
    imports: [ CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
    http = inject(HttpClient);

    userId!: string;
    expenseId!: string | null;
    expense$!: Observable<Expense>;

    // Dropdown booleans
    iconDropdownOpen = false;
    mpdDropdownOpen = false;
    ypdmDropdownOpen = false;
    ypddDropdownOpen = false;
    tempYearlyPd = "";

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
        { name: "1st", value: "00-01-0000" },
        { name: "2nd", value: "00-02-0000" },
        { name: "3rd", value: "00-03-0000" },
        { name: "4th", value: "00-04-0000" },
        { name: "5th", value: "00-05-0000" },
        { name: "6th", value: "00-06-0000" },
        { name: "7th", value: "00-07-0000" },
        { name: "8th", value: "00-08-0000" },
        { name: "9th", value: "00-09-0000" },
        { name: "10th", value: "00-10-0000" },
        { name: "11th", value: "00-11-0000" },
        { name: "12th", value: "00-12-0000" },
        { name: "13th", value: "00-13-0000" },
        { name: "14th", value: "00-14-0000" },
        { name: "15th", value: "00-15-0000" },
        { name: "16th", value: "00-16-0000" },
        { name: "17th", value: "00-17-0000" },
        { name: "18th", value: "00-18-0000" },
        { name: "19th", value: "00-19-0000" },
        { name: "20th", value: "00-20-0000" },
        { name: "21st", value: "00-21-0000" },
        { name: "22nd", value: "00-22-0000" },
        { name: "23rd", value: "00-23-0000" },
        { name: "24th", value: "00-24-0000" },
        { name: "25th", value: "00-25-0000" },
        { name: "26th", value: "00-26-0000" },
        { name: "27th", value: "00-27-0000" },
        { name: "28th", value: "00-28-0000" },
        { name: "29th", value: "00-29-0000" },
        { name: "30th", value: "00-30-0000" },
        { name: "31st", value: "00-31-0000" },
    ];

    months = [
        { name: "January" },
        { name: "February" },
        { name: "March" },
        { name: "April" },
        { name: "May" },
        { name: "June" },
        { name: "July" },
        { name: "August" },
        { name: "September" },
        { name: "October" },
        { name: "November" },
        { name: "December" }
    ];

    editExpenseForm = new FormGroup({
        name: new FormControl<string>(""),
        type: new FormControl<string>(""),
        icon: new FormControl<string>("/assets/icons/expense-icons/usd-circle.svg"),
        cost: new FormControl<number>(0),
        paymentDate: new FormControl<string>(""),
        category: new FormControl<string>("")
    });

    constructor(
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

    selectMonthlyDate(day: { name: string; value: string; }): void {
        this.editExpenseForm.get('paymentDate')?.setValue(day.name);
        this.mpdDropdownOpen = false;
    }
    selectYearlyMonth(month: { name: string; }): void {
        this.tempYearlyPd = month.name;

        this.ypdmDropdownOpen = false;
        this.ypddDropdownOpen = true;
    }
    selectYearlyDay(day: { name: string; value: string; }): void {
        this.tempYearlyPd += " " + day.name;
        this.editExpenseForm.get('paymentDate')?.setValue(this.tempYearlyPd);

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
            this.toast.danger("Icon, Name, Type, Cost, and Category fields are required.", "ERROR", 5000);
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