class LikeButton {
    constructor(element) {
        let htmlElement;
        if (!(element instanceof Element)) {
            htmlElement = document.querySelector(element);
            if (!htmlElement) {
                throw new Error('No element with selector ' + element);
            }
        } else {
            htmlElement = element;
        }

        this.htmlElement = htmlElement;

        this.onClick = this.onClick.bind(this);
        this.onLikeToggle = this.onLikeToggle.bind(this);
        this.onLikeError = this.onLikeError.bind(this);

        this.isLiked = false;

        this.htmlElement.addEventListener('click', this.onClick);

        this.render();
    }

    render() {
        this.htmlElement.textContent = this.isLiked ? '❤️' : '💔';
    }

    onClick() {
        httpRequest({
            url: this.isLiked ? 'dislike.json' : 'like.json',
            onSuccess: this.onLikeToggle,
            onError: this.onLikeError,
        });

        this.htmlElement.disabled = 'disabled';
    }

    onLikeToggle() {
        this.isLiked = !this.isLiked;

        this.likeRequestFinish();
        this.render();
    }

    onLikeError() {
        this.likeRequestFinish();
    }

    likeRequestFinish() {
        this.htmlElement.removeAttribute('disabled');
    }
}
