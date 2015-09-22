function startDemo() {
    var canvas = document.getElementById("canvas");
    var langton = new Langton(canvas, "LRLLR");
    langton.render(95000);
    langton.animate();

    var canvas = document.getElementById("canvas2");
    var langton = new Langton(canvas, "LLRR");
    langton.render(95000);
    langton.animate();
}