export function onListener(elements, eventType, cb) {
    const arr = elements.length ? elements : [elements];
    arr.forEach((element) => element.addEventListener(eventType, cb));
}