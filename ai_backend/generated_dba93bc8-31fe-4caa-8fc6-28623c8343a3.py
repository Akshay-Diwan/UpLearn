
# -*- coding: utf-8 -*-
from manim import *

class NLMScene(Scene):
    def construct(self):

        ground = Line(LEFT*5, RIGHT*5)

        block = Square(1).shift(LEFT*3)

        force_arrow = Arrow(block.get_right(), block.get_right()+RIGHT*2, color=RED)

        f_label = Text("F = 4 N", font_size=24).next_to(force_arrow, UP)

        m_label = Text("m = 2 kg", font_size=24).next_to(block, DOWN)

        a_label = Text("a = 2.00 m/s²", font_size=24).to_corner(UR)

        self.play(Create(ground))
        self.play(FadeIn(block))
        self.play(GrowArrow(force_arrow), Write(f_label))
        self.play(block.animate.shift(RIGHT*4), run_time=3)

        self.add(m_label, a_label)
