from paramExtraction import extract_params_from_llm
from manim import generate_manim_script
params = extract_params_from_llm('''
                        A ball is projected from the ground with a speed of 30 m/s at an angle of 45° with the horizontal.Take g=10m/s2.'''
                        )
generate_manim_script(params)
