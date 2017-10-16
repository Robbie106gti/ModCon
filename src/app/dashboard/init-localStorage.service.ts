
export class Init {
    load() {
        if(localStorage.getItem('accessories') === null || localStorage.getItem('accessories') === undefined) {
            return;
        } else {
            let accessories = JSON.parse(localStorage.getItem('accessories'));
            return accessories;
        }
    };
}
