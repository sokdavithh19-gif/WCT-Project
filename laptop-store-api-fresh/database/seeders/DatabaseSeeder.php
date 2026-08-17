<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Laptop;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
        Cart::create(['user_id' => $admin->id]);

        // Demo regular user
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
        Cart::create(['user_id' => $user->id]);

        // Demo laptop catalog
        $laptops = [
            ['name' => 'MacBook Air M3', 'brand' => 'Apple', 'price' => 1299.00, 'stock' => 15, 'description' => '13" M3 chip, 8GB RAM, 256GB SSD.'],
            ['name' => 'MacBook Pro 14"', 'brand' => 'Apple', 'price' => 1999.00, 'stock' => 8, 'description' => 'M3 Pro chip, 18GB RAM, 512GB SSD.'],
            ['name' => 'XPS 13', 'brand' => 'Dell', 'price' => 1099.00, 'stock' => 20, 'description' => 'Intel i7, 16GB RAM, 512GB SSD.'],
            ['name' => 'ThinkPad X1 Carbon', 'brand' => 'Lenovo', 'price' => 1450.00, 'stock' => 10, 'description' => 'Intel i7, 16GB RAM, 1TB SSD, business-grade.'],
            ['name' => 'ROG Zephyrus G14', 'brand' => 'Asus', 'price' => 1699.00, 'stock' => 5, 'description' => 'Ryzen 9, RTX 4060, 16GB RAM, gaming laptop.'],
            ['name' => 'Pavilion 15', 'brand' => 'HP', 'price' => 699.00, 'stock' => 25, 'description' => 'Intel i5, 8GB RAM, 512GB SSD, everyday laptop.'],
        ];

        foreach ($laptops as $laptop) {
            Laptop::create($laptop);
        }
    }
}
