import React from 'react';
import { IconAccountBalance, IconApartment, IconCheckroom, IconDirectionsCar, IconHouse, IconMonetizationOn, IconPalette, IconPets, IconRedeem, IconRestaurant, IconShoppingBag, IconShoppingCart, IconSportsEsports, IconWork } from '@aws-amplify/ui-react';
import { ShoppingBasket } from '@material-ui/icons';

export const incomes = [
  { type: 'Investments', amount: 0, chartColorValue: '#04700f', icon: <IconHouse/> },
  { type: 'Gifts', amount: 0, chartColorValue: '#144621', icon: <IconRedeem/> },
  { type: 'Salary', amount: 0, chartColorValue: '#254e36', icon: <IconWork/> },
  { type: 'Savings', amount: 0, chartColorValue: '#208a4e', icon: <IconAccountBalance/> },
  { type: 'Other', amount: 0, chartColorValue: '#198f60', icon: <IconMonetizationOn/> },
];

export const expenses = [
  { type: 'Rent', amount: 0, chartColorValue: '#c01013', icon: <IconApartment/> },
  { type: 'Car', amount: 0, chartColorValue: '#c03020', icon: <IconDirectionsCar/>},
  { type: 'Clothes', amount: 0, chartColorValue: '#ca4831', icon: <IconCheckroom/>},
  { type: 'Hobby', amount: 0, chartColorValue: '#d5603c', icon: <IconPalette/>},
  { type: 'Food', amount: 0, chartColorValue: '#e06b50', icon: <IconRestaurant/>},
  { type: 'Shopping', amount: 0, chartColorValue: '#f0805a', icon: <ShoppingBasket/>},
  { type: 'House', amount: 0, chartColorValue: '#f0906a', icon: <IconHouse/>},
  { type: 'Entertainment', amount: 0, chartColorValue: '#f89e81', icon: <IconSportsEsports/>},
  { type: 'Pets', amount: 0, chartColorValue: '#e64435', icon: <IconPets/>},
  { type: 'Other', amount: 0, chartColorValue: '#f02411', icon: <IconMonetizationOn/>},
];

export const resetAmounts = () => {
  incomes.forEach((category) => category.amount = 0);
  expenses.forEach((category) => category.amount = 0);
};