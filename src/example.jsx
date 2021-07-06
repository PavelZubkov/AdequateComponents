<answer Dialog>
    <header>
        <title>Hello fucking world!</title>
    </header>
    <body>
        How are you?
    </body>
    <footer>
        <button
    </footer>
</answer>
    

class Answer extends Dialog {
    header() {
        return super.header(this.title('hellog fucking world!'))
    }
}