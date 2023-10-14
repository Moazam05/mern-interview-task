// prevent auto form submission
export function onKeyDown(keyEvent: any) {
	if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
		keyEvent.preventDefault();
	}
}
