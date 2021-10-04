        // Defines an empty array  
        const purchase_history = [];
        // Defines an array populated with objects/dictionaries/hashmaps
        const coffees = [
            { name: 'Brygg Kaffe', price: 20 },
            { name: 'Cappucino', price: 30 },
            { name: 'Latte', price: 40 }
        ]

        class Customer {
            constructor() { }
            // Empty constructor, JS will create a default constructor automatically if you don't add one 

            appendTransaction(transaction) {
                let parent = document.querySelector('ul')
                let child = document.createElement('li');
                child.innerHTML = `Du köpte ${transaction.amount} ${transaction.coffee.name} för ${transaction.coffee.price} styck. Summa: ${transaction.coffee.price * transaction.amount} kr`;
                // prepend() method will put the new child element before the first child of the element.
                parent.prepend(child);
            }

            decideLevel(spent) {
                if (spent < 10) return 'Brons';
                if (spent >= 10 && spent < 30) return 'Silver';
                if (spent >= 30) return 'Guld';
            }

            output() {
                // This variable holds the total amount of cups we've purchased for 
                let purchased_amount = 0
                // This variable holds the total amount of money we've purchased for 
                let total_purchased_kr = 0

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
                    amount: amount,
                    coffee: coffees[select.selectedIndex]
                };

                // We append the transaction object to our empty purchase_history array.
                purchase_history.push(transaction);

                /* 
                   for..of is used to calculate each element of the array 
                   It loops through the values of an iterable object
                   previous value + (coffee_price * coffee_amount)
                */
                for (const history of purchase_history) {
                    total_purchased_kr += (history.coffee.price * history.amount)
                    purchased_amount += history.amount
                }

                // We loop through our purchase_history array into our id purchased_total 
                purchased_total.textContent = `${total_purchased_kr} kr`;

                /* 
                    We append the transaction object, this is what makes the purchase text show up.
                    The function renders the child element. 
                    i.e: Du köpte 1 Brygg Kaffe för 20 styck. Summa: 20 kr
                 */
                this.appendTransaction(transaction);

                // We calculate the level by adding previous value + coffee amount
                let level = this.decideLevel(purchased_amount);

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
                    new Option(`${coffee.name} - ${coffee.price}`, index)
                )
            })
            document.querySelector('button').addEventListener('click', () => {
                render.output()
            });
        }