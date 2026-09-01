// https://mci.ir/internet-plans

(async () => {
    const allPlans = [];

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const getPlans = pageNumber =>
        [...document.querySelectorAll('.package-list-item')]
            .map(el => ({
                page: pageNumber,
                volume: Number(el.dataset.volume),
                price: Number(el.dataset.price),
                pricePerKB: Number(el.dataset.price) / Number(el.dataset.volume)
            }));

    const pages = [...document.querySelectorAll('.package-list-pagination .page')];

    console.log(`Found ${pages.length} pages`);

    for (let i = 0; i < pages.length; i++) {

        console.log(`Reading page ${i + 1}...`);

        pages[i].click();

        await sleep(500);

        const plans = getPlans(i + 1);

        console.log(`Page ${i + 1}: found ${plans.length} plans`);

        allPlans.push(...plans);
    }

    allPlans.sort((a, b) => a.pricePerKB - b.pricePerKB);

    console.table(allPlans);

    const best = allPlans[0];

    console.log('\n🏆 BEST OPTION');
    console.log(`Page: ${best.page}`);
    console.log(`Data: ${best.volume.toLocaleString()} KB`);
    console.log(`Price: ${best.price.toLocaleString()} ریال`);
    console.log(`Price per KB: ${best.pricePerKB.toFixed(2)} ریال`);
})();
