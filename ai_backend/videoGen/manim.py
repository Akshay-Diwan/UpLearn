import subprocess

def generate_manim_script(params):

    velocity = params["velocity"]
    angle = params["angle"]

    script = f"""
from manim import *
import numpy as np

class ProjectileScene(Scene):
    def construct(self):

        velocity = {velocity}
        angle = np.radians({angle})
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
"""

    with open("generated_scene.py", "w") as f:
        f.write(script)

       # 🔥 Render video
    subprocess.run([
        "manim",
        "-ql",
        "generated_scene.py",
        "ProjectileScene"
    ])

    # Return video path
    video_path = "media/videos/generated_scene/480p15/ProjectileScene.mp4"

    return video_path