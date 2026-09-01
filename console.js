// https://my.mci.ir/panel/packages/list/madaar_firoozeyi?filter=internet_fandom_filter

const packages = [...document.querySelectorAll('app-package-list-detail')]
    .map((el, index) => {
        const title = el.querySelector('.title')?.innerText.trim() || '';
        const duration = el.querySelector('.duration')?.innerText.trim() || '';
        const priceText = el.querySelector('.price-info')?.innerText || '';

        // Extract GB from title
        const gbMatch = title.match(/([\d.]+)\s*گیگابایت/);
        const gb = gbMatch ? Number(gbMatch[1]) : null;

        // Extract price
        const priceMatch = priceText.replace(/,/g, '').match(/\d+/);
        const price = priceMatch ? Number(priceMatch[0]) : null;

        return {
            number: index + 1,
            package: title,
            duration: duration,
            gb: gb,
            price: price,
            pricePerGB: gb && price ? price / gb : null
        };
    })
    .filter(p => p.gb && p.price);

// Cheapest per GB first
packages.sort((a, b) => a.pricePerGB - b.pricePerGB);

console.table(packages);

const best = packages[0];

console.log('\n🏆 BEST OPTION');
console.log(`Package: ${best.package}`);
console.log(`Duration: ${best.duration}`);
console.log(`Data: ${best.gb} GB`);
console.log(`Price: ${best.price.toLocaleString()} ریال`);
console.log(`Price per GB: ${best.pricePerGB.toLocaleString(undefined, {
    maximumFractionDigits: 0
})} ریال`);
