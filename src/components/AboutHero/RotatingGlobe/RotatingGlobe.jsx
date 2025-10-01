import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule, json } from 'd3';
import * as topojson from 'topojson-client';

const RotatingGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const width = 650;
    const height = 650;
    const speed = -15; // градусів за секунду
    const start = Date.now();

    const sphere = { type: 'Sphere' };

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 🔑 Масштабування під devicePixelRatio
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(ratio, ratio);

    const projection = geoOrthographic()
      .scale(width / 2.1)
      .translate([width / 2, height / 2])
      .precision(0.5);

    const graticule = geoGraticule();
    const path = geoPath().projection(projection).context(context);

    json(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95802/world-110m.json'
    ).then(topo => {
      const land = topojson.feature(topo, topo.objects.land);
      const grid = graticule();

      function draw() {
        const elapsed = (Date.now() - start) / 1000; // секунди
        context.clearRect(0, 0, width, height);

        projection.rotate([speed * elapsed, -15]).clipAngle(90);

        // sphere
        context.beginPath();
        path(sphere);
        context.fillStyle = 'transparent';
        context.fill();

        projection.clipAngle(180);

        // back hemisphere
        context.beginPath();
        path(land);
        context.fillStyle = '#958240ff';
        context.fill();

        // graticule
        context.beginPath();
        path(grid);
        context.lineWidth = 0.5;
        context.strokeStyle = 'rgba(119,119,119,0)';
        context.stroke();

        projection.clipAngle(90);

        // front hemisphere
        context.beginPath();
        path(land);
        context.fillStyle = '#fce286';
        context.fill();

        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

export default RotatingGlobe;
