
# -*- coding: utf-8 -*-
from manim import *
import numpy as np

class CircularScene(Scene):
    def construct(self):

        circle = Circle(radius=2, color=BLUE)
        dot = Dot(color=YELLOW).move_to(circle.point_at_angle(0))

        label = Text("Circular Motion", font_size=28).to_edge(UP)

        self.play(Create(circle), Write(label))

        self.play(
            MoveAlongPath(dot, circle),
            run_time=4,
            rate_func=linear
        )

        info = VGroup(
            Text("r = 2 m", font_size=24),
            Text("ω = 2 rad/s", font_size=24)
        ).arrange(DOWN).to_corner(UR)

        self.add(dot, info)
