document.addEventListener("DOMContentLoaded",()=>{
    const container=document.querySelector('.container')
    const categories=[
        {name:"Simple Interest Calculator", img:"img7.svg", content:`<div class="principal">
                    <label for="principal">Principal Amount: </label>
                    <input type="text" name="principal" placeholder="Enter Principal">
                </div>
                <div class="rate">
                    <label for="rate">Rate of Interest(%): </label>
                    <input type="text" name="rate" placeholder="Enter Rate(p.a)">
                </div>
                <div class="time">
                    <label for="time">Time period: </label>
                    <input type="text" name="time" placeholder="Enter Tenure(yrs)">
                </div>`},

        {name:"Compound Interest Calculator", img:"img4.svg", content:`<div class="principal">
            <label for="principal">Principal Amount: </label>
            <input type="text" name="principal" placeholder="Enter Principal">
        </div>
        <div class="rate">
            <label for="rate">Rate of Interest(%): </label>
            <input type="text" name="rate" placeholder="Enter Rate(p.a)">
        </div>
        <div class="time">
            <label for="time">Time period: </label>
            <input type="text" name="time" placeholder="Enter Tenure(yrs)">
        </div>
        <div class="n">
            <label for="n">Number of times interest is compounded(per year): </label>
            <input type="text" name="n" placeholder="Enter n">
        </div>`},

        {name:"Currency Calculator", img:"img3.svg", content:`<div class="amount">
            <label for="amount">Amount: </label>
            <input type="text" name="amount" placeholder="Enter Amount">
        </div>
        <div class="fromCurrency">
            <label for="fromCurrency">From Currency: </label>
            <select name="fromCurrency">
                <option value="INR">INR-Indian Rupee</option>
                <option value="USD">USD-US Dollar</option>
                <option value="GBP">GBP-Great Britain Pound</option>
            </select>
        </div>
        <div class="toCurrency">
            <label for="toCurrency">To Currency: </label>
            <select name="toCurrency">
                <option value="USD">USD-US Dollar</option>
                <option value="INR">INR-Indian Rupee</option>
                <option value="GBP">GBP-Great Britain Pound</option>
            </select>
        </div>`},

        {name:"Salary Calculator", img:"img5.svg", content:`<div class="salary">
            <label for="salary">Your CTC: </label>
            <input type="text" name="salary" placeholder="Enter Gross Salary">
        </div>
        <div class="deductions">
            <label for="deductions">Deductions: </label>
            <input type="text" name="deductions" placeholder="Enter salary deductions">
        </div>
        <div class="bonus">
            <label for="bonus">Bonuses: </label>
            <input type="text" name="bonus" placeholder="Enter Bonuses">
        </div>`},

        {name:"Retirement Calculator", img:"img2.svg", content:`<div class="savings">
            <label for="savings">Savings: </label>
            <input type="text" name="savings" placeholder="Enter Savings">
        </div>
        <div class="rate">
            <label for="rate">Return Rate: </label>
            <input type="text" name="rate" placeholder="Enter Expected Return Rate">
        </div>
        <div class="currAge">
            <label for="currAge">Age now: </label>
            <input type="text" name="currAge" placeholder="Enter your current Age">
        </div>
        <div class="retireAge">
            <label for="retireAge">Retirement Age: </label>
            <input type="text" name="retireAge" placeholder="Enter age of Retirement">
        </div>`},

        {name:"Sales and Tax Calculator", img:"img6.svg", content:`<div class="beforeTax">
            <label for="beforeTax">Price before Tax: </label>
            <input type="text" name="beforeTax" placeholder="Enter Price before Tax">
        </div>
        <div class="rate">
            <label for="rate">Sales Tax Rate: </label>
            <input type="text" name="rate" placeholder="Enter Rate">
        </div>`},

        {name:"Investment Calculator", img:"img1.svg", content:`
        <div class="principal">
            <label for="principal">Initial Investment: </label>
            <input type="text" name="principal" placeholder="Enter Initial Amount">
        </div>
        <div class="contribution">
            <label for="contribution">Periodic Contribution (SIP): </label>
            <input type="text" name="contribution" placeholder="Enter Contribution Amount">
        </div>
        <div class="rate">
            <label for="rate">Expected Return Rate (% p.a): </label>
            <input type="text" name="rate" placeholder="Enter Expected Rate">
        </div>
        <div class="time">
            <label for="time">Investment Duration (Years): </label>
            <input type="text" name="time" placeholder="Enter Time Period">
        </div>
        <div class="n">
            <label for="n">Compounding Frequency (per year): </label>
            <input type="text" name="n" placeholder="Enter n">
        </div>`},
    ]
    let clutter=""
    categories.forEach(obj=>{
        clutter+=`<div class="cards">
            <img src="${obj.img}" alt="">
            ${obj.name}</div>`
    })
    container.innerHTML=clutter

    const cards=document.querySelectorAll('.cards')
    const overlay=document.querySelector('.overlay')
    const menu=document.querySelector('.menu')
    

    cards.forEach((card,idx)=>{
        card.addEventListener("click",()=>{
            const index=idx
            const selectedCategory=categories[idx]

            menu.innerHTML=`
            <div class="query">
                <div class="inputs">
                    ${selectedCategory.content}
                </div>
                <div class="calculateBtn">
                    <button>Calculate</button>
                </div>
            </div>
            <div class="result">
                <div class="resHead"><h2>Results</h2></div>
                <div class="resContent">

                </div>
            </div>`

            overlay.style.display='block'
            menu.style.display='flex'

            const result=document.querySelector('.result')
            const calculateBtn=document.querySelector('.calculateBtn button')
            const resContent=document.querySelector('.result .resContent')

            let calculatedVal

            calculateBtn.onclick=function(){
                if(selectedCategory.name==="Simple Interest Calculator"){
                    const principal=parseFloat(document.querySelector('.principal input').value)
                    const rate=parseFloat(document.querySelector('.rate input').value)
                    const time=parseFloat(document.querySelector('.time input').value)
                    
                    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
                        result.innerHTML = `<h3>Please enter valid numerical values</h3>`;
                        return;
                    }
                    calculatedVal=(principal*rate*time)/100
                    
                    resContent.innerHTML=`
                    <div><h3>Principal Amount:</h3><span>${principal}</span></div>
                    <div><h3>Total Interest:</h3><span>${calculatedVal}</span></div>
                    <div><h3>Total Amount:</h3><span>${principal+calculatedVal}</span></div>
                    `
                }
                else if(selectedCategory.name==="Compound Interest Calculator"){
                    const principal=parseFloat(document.querySelector('.principal input').value)
                    const rate=parseFloat(document.querySelector('.rate input').value)
                    const time=parseFloat(document.querySelector('.time input').value)
                    const n=parseFloat(document.querySelector('.n input').value)

                    calculatedVal=principal*Math.pow(1+(rate/100)/n,n*time)

                    resContent.innerHTML=`
                    <div><h3>Principal Amount:</h3><span>${principal}</span></div>
                    <div><h3>Total Interest:</h3><span>${(calculatedVal-principal).toFixed(2)}</span></div>
                    <div><h3>Total Amount:</h3><span>${calculatedVal.toFixed(2)}</span></div>
                    `
                }
                else if(selectedCategory.name==="Currency Calculator"){
                    const amount=parseFloat(document.querySelector('.amount input').value)
                    const fromCurrency=document.querySelector('[name=fromCurrency]').value
                    const toCurrency=document.querySelector('[name=toCurrency]').value

                    if(fromCurrency==="INR"){
                        if(toCurrency=="USD"){
                            calculatedVal=amount*0.012
                        }
                        else if(toCurrency==="GBP"){
                            calculatedVal=amount*0.0089
                        }
                    }
                    else if(fromCurrency==="USD"){
                        if(toCurrency=="INR"){
                            calculatedVal=amount*86
                        }
                        else if(toCurrency==="GBP"){
                            calculatedVal=amount*0.77
                        }
                    }
                    if(fromCurrency==="GBP"){
                        if(toCurrency=="INR"){
                            calculatedVal=amount*112
                        }
                        else if(toCurrency==="USD"){
                            calculatedVal=amount*1.3
                        }
                    }
                    resContent.innerHTML=`
                    <div><h3>Amount in ${fromCurrency}:</h3><span>${amount}</span></div>
                    <div><h3>After Conversion:</h3><span>${calculatedVal}</span></div>
                    `
                }
                else if(selectedCategory.name==="Salary Calculator"){
                    const salary=parseFloat(document.querySelector('.salary input').value)
                    const deductions=parseFloat(document.querySelector('.deductions input').value)
                    const bonus=parseFloat(document.querySelector('.bonus input').value)

                    calculatedVal=salary+bonus-deductions

                    resContent.innerHTML=`
                    <div><h3>Net Salary:</h3><span>${calculatedVal}</span></div>`
                }
                else if(selectedCategory.name==="Retirement Calculator"){
                    const savings=parseFloat(document.querySelector('.savings input').value)
                    const rate=parseFloat(document.querySelector('.rate input').value)
                    const currAge=parseFloat(document.querySelector('.currAge input').value)
                    const retireAge=parseFloat(document.querySelector('.retireAge input').value)

                    calculatedVal=savings*Math.pow(1+rate/100,retireAge-currAge)

                    resContent.innerHTML=`
                    <div><h3>Retirement Corpus:</h3><span>${calculatedVal.toFixed(2)}</span></div>`
                }
                else if(selectedCategory.name==="Sales and Tax Calculator"){
                    const beforeTax=parseFloat(document.querySelector('.beforeTax input').value)
                    const rate=parseFloat(document.querySelector('.rate input').value)

                    calculatedVal=beforeTax+beforeTax*(rate/100)

                    resContent.innerHTML=`
                    <div><h3>Price after Tax:</h3><span>${calculatedVal}</span></div>`
                }
                else if(selectedCategory.name==="Investment Calculator"){
                    const principal = parseFloat(document.querySelector('.principal input').value);
                    const contribution = parseFloat(document.querySelector('.contribution input').value);
                    const rate = parseFloat(document.querySelector('.rate input').value);
                    const time = parseFloat(document.querySelector('.time input').value);
                    const n = parseFloat(document.querySelector('.n input').value);
                
                    const principalFutureValue = principal * Math.pow(1 + (rate / 100) / n, n * time);
                
                    const sipFutureValue = contribution * ((Math.pow(1 + (rate / 100) / n, n * time) - 1) / (rate / 100 / n));
                
                    calculatedVal = principalFutureValue + sipFutureValue;
                
                    resContent.innerHTML = `
                        <div><h3>Initial Investment (Principal):</h3><span>${principal}</span> <br></div>
                        <div><h3>Total SIP Contributions:</h3><span>${(contribution * n * time).toFixed(2)}</span> <br></div>
                        <div><h3>Total Interest Earned:</h3><span>${(calculatedVal - (principal + (contribution * n * time))).toFixed(2)}</span> <br></div>
                        <div><h3>Total Investment Value:</h3><span>${calculatedVal.toFixed(2)}</span></div>
                    `;
                }
                
                
            }

        })
    })

    overlay.addEventListener("click", () => {
        overlay.style.display = 'none';
        menu.style.display = 'none';
    });
    

})