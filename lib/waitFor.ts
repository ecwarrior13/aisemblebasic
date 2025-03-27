

export function waitFor(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//file to wait for a certain amount of time

