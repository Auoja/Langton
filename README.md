# Langton's Ant

A simple js implementation of Langton's ant using multiple colors.

![Example](/../images/images/example.png?raw=true)

##Usage

```javascript

  var canvas = document.getElementById("canvas");
  var name = "LLRR"; // Determines the direction the ant should turn for each successive color
  var ant = new Langton(canvas, name);
  ant.render(95000); // Render the ant after 95000 iterations
  ant.animate(); // Animates the ant
```
