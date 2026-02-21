import subprocess
import uuid
from pathlib import Path

MEDIA_ROOT = "media"


def run_manim(scene_name, file_name):
    subprocess.run([
        "manim",
        "-ql",
        file_name,
        scene_name
    ], check=True)

    video = list(Path(MEDIA_ROOT).rglob(f"{scene_name}.mp4"))[0]
    return str(video)


def generate_manim_script(params):

    uid = str(uuid.uuid4())
    file_name = f"generated_{uid}.py"

    qtype = params["type"]

    # ---------------- PROJECTILE ----------------
    if qtype == "projectile":
        velocity = params["velocity"]
        angle = params["angle"]

        script = f"""
# -*- coding: utf-8 -*-
from manim import *
import numpy as np

class ProjectileScene(Scene):
    def construct(self):

        axes = Axes(
            x_range=[0, 10],
            y_range=[0, 6],
            axis_config={{"include_numbers": True}}
        )
        labels = axes.get_axis_labels("x", "y")

        self.play(Create(axes), Write(labels))

        velocity = {velocity}
        angle = np.radians({angle})
        g = 9.8

        dot = Dot(color=YELLOW)

        def position(t):
            x = velocity*np.cos(angle)*t
            y = velocity*np.sin(angle)*t - 0.5*g*t*t
            return axes.c2p(x/5, y/5)

        path = ParametricFunction(position, t_range=[0, 3], color=BLUE)

        info = VGroup(
            Text(f"u = {velocity} m/s", font_size=24),
            Text(f"θ = {angle}°", font_size=24)
        ).arrange(DOWN).to_corner(UR)

        self.play(Create(path))
        self.play(MoveAlongPath(dot, path), run_time=3)
        self.add(dot, info)
"""

        scene = "ProjectileScene"

    # ---------------- CIRCULAR ----------------
    elif qtype == "circular":
        radius = params["radius"]
        omega = params["omega"]

        script = f"""
# -*- coding: utf-8 -*-
from manim import *
import numpy as np

class CircularScene(Scene):
    def construct(self):

        circle = Circle(radius={radius}, color=BLUE)
        dot = Dot(color=YELLOW).move_to(circle.point_at_angle(0))

        label = Text("Circular Motion", font_size=28).to_edge(UP)

        self.play(Create(circle), Write(label))

        self.play(
            MoveAlongPath(dot, circle),
            run_time=4,
            rate_func=linear
        )

        info = VGroup(
            Text("r = {radius} m", font_size=24),
            Text("ω = {omega} rad/s", font_size=24)
        ).arrange(DOWN).to_corner(UR)

        self.add(dot, info)
"""

        scene = "CircularScene"

    # ---------------- NLM ----------------
    elif qtype == "nlm":
        force = params["force"]
        mass = params["mass"]
        acc = force / mass

        script = f"""
# -*- coding: utf-8 -*-
from manim import *

class NLMScene(Scene):
    def construct(self):

        ground = Line(LEFT*5, RIGHT*5)

        block = Square(1).shift(LEFT*3)

        force_arrow = Arrow(block.get_right(), block.get_right()+RIGHT*2, color=RED)

        f_label = Text("F = {force} N", font_size=24).next_to(force_arrow, UP)

        m_label = Text("m = {mass} kg", font_size=24).next_to(block, DOWN)

        a_label = Text("a = {acc:.2f} m/s²", font_size=24).to_corner(UR)

        self.play(Create(ground))
        self.play(FadeIn(block))
        self.play(GrowArrow(force_arrow), Write(f_label))
        self.play(block.animate.shift(RIGHT*4), run_time=3)

        self.add(m_label, a_label)
"""

        scene = "NLMScene"

    else:
        raise ValueError("Unknown question type")

    # ---------------- WRITE FILE ----------------
    with open(file_name, "w", encoding="utf-8") as f:
        f.write(script)

    # ---------------- RENDER ----------------
    video_path = run_manim(scene, file_name)

    return video_path