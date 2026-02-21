
from manim import *
import numpy as np

class ProjectileScene(Scene):
    def construct(self):

        velocity = 30
        angle = np.radians(60)
        g = 9.8

        dot = Dot(color=BLUE)

        def position(t):
            x = velocity*np.cos(angle)*t
            y = velocity*np.sin(angle)*t - 0.5*g*t*t
            return np.array([x/5, y/5, 0])

        self.play(
            MoveAlongPath(
                dot,
                ParametricFunction(position, t_range=[0, 3]),
            ),
            run_time=3
        )

        self.add(dot)
