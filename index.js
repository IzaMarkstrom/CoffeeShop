        // Defines an empty array  
        const purchase_history = [];
        // Defines an array populated with objects/dictionaries/hashmaps
        const coffees = [
            { name: 'Brygg Kaffe', price: 10, selected: false },
            { name: 'Latte', price: 45, selected: true },
            { name: 'Cappucino', price: 25, selected: false }
        ]

        class Customer {
            constructor() { }
            // Empty constructor, JS will create a default constructor automatically if you don't add one 

            appendTransaction(transaction) {
                let parent = document.querySelector('ul')
                let child = document.createElement('li');
                let message = `
                    Du har köpt ${transaction.coffee.name} för ${transaction.price} styck. Totalt värde: ${transaction.total} kr.
                    Du var ${transaction.membership} när denna transaktion utfördes. 
                    
                `;
                if(transaction.membership !== "Ultra Premium") {
                    message += `Handla ${transaction.cupsUntilNextLevel} koppar till för att upp nå ${this.getNextLevel(transaction.membership)} status`
                }
                child.innerHTML = message
                // prepend() method will put the new child element before the first child of the element.
                parent.prepend(child);
            }

            decideLevel(spent) {
                if (spent < 5) return 'Normal';
                if (spent >= 5 && spent < 15) return 'Premium';
                if (spent >= 15) return 'Ultra Premium';
            }
            
            cupsUntilNextLevel() {
                const totalCups = this.getTotalCupPurchased()
                if(totalCups < 5) {
                    return 5 - totalCups
                } else if(5 <= totalCups && totalCups < 15) {
                    return 15 - totalCups
                } else if (totalCups >= 15) {
                    return 0
                }
            }

            getNextLevel(level) {
                if(level === "Normal") {
                    return "Premium"
                } else if(level === "Premium"){
                    return "Ultra Premium"
                } else {
                    return ""
                }
            }

            getTotalCupPurchased() {
                let totalCups = 0
                for (const history of purchase_history) {
                    totalCups += history.amount
                }
                return totalCups

            }

            getTotalPurchased() {
                let purchased_amount = 0
                for (const history of purchase_history) {
                    purchased_amount += history.total
                }
                return purchased_amount
            }

            getDiscount() {
                const purchased_amount = this.getTotalPurchased()
                if(purchased_amount > 800 && purchased_amount < 1200) {
                    return 0.95
                } else if(purchased_amount >= 1200) {
                    return 0.85
                } else {
                    return 1
                }
            }
            output() {
                // This variable holds the total amount of cups we've purchased for 
                // This variable holds the total amount of money we've purchased for 

                // We get the tag select in for us to use selectedIndex in transactions.
                // By not doing this we wouldn't be able to access the array with objects.
                let select = document.querySelector('select');

                // We select the value of the <input> element. 
                // Since it returns a string, we cast it to an int using parseInt() 
                let amount = parseInt(document.querySelector('input').value); 

                if (amount < 1) return window.alert('Du måste minst köpa en kopp');
                if (amount > 10) return window.alert('Du får max köpa 10 koppar samtidigt');

                // Selects element with id purchased-total, i.e: <span id"purchaed-total">0 kr</span> 
                let purchased_total = document.getElementById('purchased-total');

                /* 
                   This transaction object passes into appendTransaction() on line 46.
                   We get the property selectedIndex from our select variable defined on line 65.
                   We use the selectedIndex to access an indice in the coffees object. 
                   i.e: if selected index is 0, we get the first object from the coffees array. 
                */
                let transaction = {
                    amount: parseInt(amount),
                    coffee: coffees[select.selectedIndex],
                    
                };

                // We append the transaction object to our empty purchase_history array.
                purchase_history.push(transaction);
                let latest = purchase_history[purchase_history.length-1]
                
                latest.price = coffees[select.selectedIndex].price * this.getDiscount(),
                latest.total = coffees[select.selectedIndex].price * parseInt(amount) * this.getDiscount(),
                latest.membership = this.decideLevel(this.getTotalCupPurchased()),
                latest.cupsUntilNextLevel = this.cupsUntilNextLevel()
                purchase_history[purchase_history.length -1 ] = latest

                /* 
                   for..of is used to calculate each element of the array 
                   It loops through the values of an iterable object
                   previous value + (coffee_price * coffee_amount)
                */

                // We loop through our purchase_history array into our id purchased_total 
                purchased_total.textContent = `${this.getTotalPurchased()} kr`;

                /* 
                    We append the transaction object, this is what makes the purchase text show up.
                    The function renders the child element. 
                    i.e: Du köpte 1 Brygg Kaffe för 20 styck. Summa: 20 kr
                 */
                this.appendTransaction(transaction);

                // We calculate the level by adding previous value + coffee amount
                let level = this.decideLevel(this.getTotalCupPurchased());

                document.getElementById('membership-status').textContent = level;
                // This changes the textcontent from "Du har inga transaktioner" to "Dina transaktioner"
                document.querySelector("h3").textContent = "Dina transaktioner"
            }
        }

        window.onload = () => {
            // Creates an instance of class Customer
            const render = new Customer()

            const coffeeList = document.getElementById("coffeeList")
            coffees.forEach((coffee, index) => {
                coffeeList.options.add(
                    new Option(`${coffee.name} - ${coffee.price}`, index, coffee.selected, coffee.selected)
                )
            })
            document.querySelector('button').addEventListener('click', () => {
                render.output()
            });
        }