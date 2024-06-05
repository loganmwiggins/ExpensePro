import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Expense } from '../../models/expense.model';

@Component({
    selector: 'app-edit-expense',
    standalone: true,
    imports: [ CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
    http = inject(HttpClient);

    expenseId!: string | null;
    expense$!: Observable<Expense>;

    dropdownOpen = false;

    iconsFinance= [
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

    iconsEntertainment= [
        { path: "/assets/icons/expense-icons/music-note.svg", name: "Music" },
        { path: "/assets/icons/expense-icons/tv-retro.svg", name: "TV Retro" },
        { path: "/assets/icons/expense-icons/clapperboard.svg", name: "Clapperboard" },
        { path: "/assets/icons/expense-icons/gamepad.svg", name: "Game Controller" },
        { path: "/assets/icons/expense-icons/joystick.svg", name: "Joystick" },
        { path: "/assets/icons/expense-icons/microphone.svg", name: "Microphone" },
        { path: "/assets/icons/expense-icons/ticket.svg", name: "Ticket" },
        { path: "/assets/icons/expense-icons/golf-club.svg", name: "Golf Club" }
    ];

    iconsTech= [
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

    iconsOther= [
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

    editExpenseForm = new FormGroup({
        name: new FormControl<string>(""),
        type: new FormControl<string>(""),
        icon: new FormControl<string>("/assets/icons/expense-icons/usd-circle.svg"),
        cost: new FormControl<number>(0),
        paymentDate: new FormControl<string>(""),
        category: new FormControl<string>("")
    });

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.expenseId = id;

        if (id !== null) { this.loadExpense(id); }
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

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    selectIcon(icon: { path: string; name: string }): void {
        this.editExpenseForm.get('icon')?.setValue(icon.path);
        this.dropdownOpen = false;
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
            alert("Icon, Name, Type, Cost, and Category fields are required.");
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
                        alert("Expense updated successfully.");
                    },
                    error: (error) => {
                        alert("Error updating expense.");
                    }
                });
        } else {
            // Add new expense
            const newExpense = this.editExpenseForm.value;

            this.http.post(`https://localhost:7265/api/Expenses`, newExpense)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/']); // Redirect to the dashboard
                        alert("Expense added successfully.");
                    },
                    error: (error) => {
                        alert("Error adding expense.");
                    }
                });
        }
    }
}