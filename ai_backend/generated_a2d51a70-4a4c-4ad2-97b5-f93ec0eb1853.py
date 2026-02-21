
# -*- coding: utf-8 -*-
from manim import *
import numpy as np

class ProjectileScene(Scene):
    def construct(self):

        axes = Axes(
            x_range=[0, 10],
            y_range=[0, 6],
            axis_config={"include_numbers": True}
        )
        labels = axes.get_axis_labels("x", "y")

        self.play(Create(axes), Write(labels))

        velocity = 30
        angle = np.radians(60)
        g = 9.8

        dot = Dot(color=YELLOW)

        def position(t):
            x = velocity*np.cos(angle)*t
            y = velocity*np.sin(angle)*t - 0.5*g*t*t
            return axes.c2p(x/5, y/5)

        path = ParametricFunction(position, t_range=[0, 3], color=BLUE)

        info = VGroup(
            Text(f"u = 30 m/s", font_size=24),
            Text(f"θ = 60°", font_size=24)
        ).arrange(DOWN).to_corner(UR)

        self.play(Create(path))
        self.play(MoveAlongPath(dot, path), run_time=3)
        self.add(dot, info)
