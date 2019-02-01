let container = document.querySelector('.container');
for (let i = 2; i <= 9; i++){
    let section1 = ``;
    let section2 = ``;
    for (let j = 1; j <= 9; j++){
        if (j <= 3) {
            section1 += `<li>${i} x ${j} = ${i*j}</li>`
        }
        else {
            section2 += `<li>${i} x ${j} = ${i*j}</li>`
        }
    }
    container.innerHTML += `
    <div class="block">
            <div class="inner-block">
                <span class="number">${i}</span>
                <ui class="formula">
                    ${section1}
                </ui>
            </div>
            <div class="inner-block-col2">
                <ui class="formula">
                    ${section2}
                </ui>
            </div>
        </div>
    `
    
}
