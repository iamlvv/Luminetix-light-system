from yolobit import *
button_a.on_pressed = None
button_b.on_pressed = None
button_a.on_pressed_ab = button_b.on_pressed_ab = -1
from mqtt import *
from machine import RTC
import ntptime
import time
from aiot_lcd1602 import LCD1602
from event_manager import *
from machine import Pin, SoftI2C
from aiot_dht20 import DHT20
import music
import sys
import uselect
from aiot_rgbled import RGBLed
from aiot_ir_receiver import *

aiot_lcd1602 = LCD1602()

event_manager.reset()

aiot_dht20 = DHT20(SoftI2C(scl=Pin(22), sda=Pin(21)))

def on_event_timer_callback_j_i_q_m_M():
  global t_C3_ADn_hi_E1_BB_87u, cmd, S_TEMP, RT, S_LUX, S_HUMI, RH, LUX, CONTEXT
  if pin3.read_digital()==1:
    display.scroll(1)
    print('!1:HUMAN:1#', end =' ')
  else:
    display.scroll(0)
    print('!1:HUMAN:0#', end =' ')
  if S_TEMP == 'ON':
    aiot_dht20.read_dht20()
    RT = aiot_dht20.dht20_temperature()
    aiot_lcd1602.move_to(0, 0)
    aiot_lcd1602.putstr('T:')
    aiot_lcd1602.move_to(2, 0)
    aiot_lcd1602.putstr((str(RT) + '*C'))
    print((''.join([str(x) for x in ['!1:TEMP:', RT, '#']])), end =' ')
    if RT > 45 or RT < 5:
      music.play(music.JUMP_UP, wait=True)
    else:
      music.stop()
  if S_HUMI == 'ON':
    aiot_dht20.read_dht20()
    RH = aiot_dht20.dht20_humidity()
    aiot_lcd1602.move_to(9, 0)
    aiot_lcd1602.putstr('H:')
    aiot_lcd1602.move_to(11, 0)
    aiot_lcd1602.putstr((str(RH) + '%'))
    print((''.join([str(x2) for x2 in ['!1:HUMI:', RH, '#']])), end =' ')
  if S_LUX == 'ON':
    LUX = round(translate((pin2.read_analog()), 0, 4095, 0, 100))
    aiot_lcd1602.move_to(9, 1)
    aiot_lcd1602.putstr('L:')
    aiot_lcd1602.move_to(11, 1)
    aiot_lcd1602.putstr((str(LUX) + '%'))
    print((''.join([str(x3) for x3 in ['!1:LIGHT:', LUX, '#']])), end =' ')
  aiot_lcd1602.move_to(0, 1)
  aiot_lcd1602.putstr('D:')
  aiot_lcd1602.move_to(2, 1)
  aiot_lcd1602.putstr(('%0*d' % (2, RTC().datetime()[2])))
  aiot_lcd1602.move_to(4, 1)
  aiot_lcd1602.putstr('/')
  aiot_lcd1602.move_to(5, 1)
  aiot_lcd1602.putstr(('%0*d' % (2, RTC().datetime()[1])))

event_manager.add_timer_event(20000, on_event_timer_callback_j_i_q_m_M)

def read_terminal_input():
  spoll=uselect.poll()        # Set up an input polling object.
  spoll.register(sys.stdin, uselect.POLLIN)    # Register polling object.

  input = ''
  if spoll.poll(0):
    input = sys.stdin.read(1)

    while spoll.poll(0):
      input = input + sys.stdin.read(1)

  spoll.unregister(sys.stdin)
  return input

tiny_rgb = RGBLed(pin0.pin, 4)

def on_event_timer_callback_Y_E_N_A_a():
  global t_C3_ADn_hi_E1_BB_87u, cmd, S_TEMP, RT, S_LUX, S_HUMI, RH, LUX, CONTEXT
  cmd = read_terminal_input()
  if cmd[0] == 'L':
    if cmd == 'L_ON':
      S_LUX = 'ON'
    else:
      S_LUX = 'OFF'
  if cmd[0] == 'T':
    if cmd == 'T_ON':
      S_TEMP = 'ON'
    else:
      S_TEMP = 'OFF'
  if cmd[0] == 'H':
    if cmd == 'H_ON':
      S_HUMI = 'ON'
    else:
      S_HUMI = 'OFF'
  if cmd[0] == 'A':
    if cmd == 'ALERT':
      music.play(music.POWER_UP, wait=True)
    else:
      music.stop()
  if cmd[0] == '#':
    tiny_rgb.show(0, hex_to_rgb((str(cmd))))
  if (int(cmd)) >= 0 and (int(cmd)) <= 100:
    pin10.write_analog(round(translate((int(cmd)), 0, 100, 0, 1023)))

event_manager.add_timer_event(200, on_event_timer_callback_Y_E_N_A_a)

def on_event_timer_callback_u_W_i_F_N():
  global t_C3_ADn_hi_E1_BB_87u, cmd, S_TEMP, RT, S_LUX, S_HUMI, RH, LUX, CONTEXT
  if cmd == 'AI_ON':
    tiny_rgb.show(0, hex_to_rgb('#ffffff'))
    print('!1:LED:ffffff#', end =' ')
  if cmd == 'AI_OFF':
    tiny_rgb.show(0, hex_to_rgb('#000000'))
    print('!1:LED:000000#', end =' ')
  if cmd == 'AI_0':
    pin10.write_analog(round(translate(0, 0, 100, 0, 1023)))
    print('!1:FAN:0#', end =' ')
  if cmd == 'AI_25':
    pin10.write_analog(round(translate(25, 0, 100, 0, 1023)))
    print('!1:FAN:25#', end =' ')
  if cmd == 'AI_50':
    pin10.write_analog(round(translate(50, 0, 100, 0, 1023)))
    print('!1:FAN:50#', end =' ')
  if cmd == 'AI_75':
    pin10.write_analog(round(translate(75, 0, 100, 0, 1023)))
    print('!1:FAN:75#', end =' ')
  if cmd == 'AI_100':
    pin10.write_analog(round(translate(100, 0, 100, 0, 1023)))
    print('!1:FAN:100#', end =' ')
  if cmd == 'AI_ALERT':
    music.stop()

event_manager.add_timer_event(200, on_event_timer_callback_u_W_i_F_N)

aiot_ir_rx = IR_RX(Pin(pin1.pin, Pin.IN)); aiot_ir_rx.start();

def on_ir_receive_callback(t_C3_ADn_hi_E1_BB_87u, addr, ext):
  global cmd, S_TEMP, RT, S_LUX, S_HUMI, RH, LUX, CONTEXT
  if aiot_ir_rx.get_code() == IR_REMOTE_A:
    tiny_rgb.show(0, hex_to_rgb('#000000'))
    print('!1:LED:000000#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_C:
    tiny_rgb.show(0, hex_to_rgb('#ffffff'))
    print('!1:LED:ffffff#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_0:
    pin10.write_analog(round(translate(0, 0, 100, 0, 1023)))
    print('!1:FAN:0#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_1:
    pin10.write_analog(round(translate(25, 0, 100, 0, 1023)))
    print('!1:FAN:25#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_2:
    pin10.write_analog(round(translate(50, 0, 100, 0, 1023)))
    print('!1:FAN:50#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_3:
    pin10.write_analog(round(translate(75, 0, 100, 0, 1023)))
    print('!1:FAN:75#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_4:
    pin10.write_analog(round(translate(100, 0, 100, 0, 1023)))
    print('!1:FAN:100#', end =' ')
  if aiot_ir_rx.get_code() == IR_REMOTE_B:
    music.stop()
  aiot_ir_rx.clear_code()
  time.sleep_ms(1000)

aiot_ir_rx.on_received(on_ir_receive_callback)

if True:
  display.scroll('SETUP')
  mqtt.connect_wifi('kfViwN', '0782075575')
  ntptime.settime()
  (year, month, mday, week_of_year, hour, minute, second, milisecond) = RTC().datetime()
  RTC().init((year, month, mday, week_of_year, hour+7, minute, second, milisecond))
  aiot_lcd1602.clear()
  S_LUX = 'ON'
  S_TEMP = 'ON'
  S_HUMI = 'ON'
  CONTEXT = 'OFF'
  display.scroll('GO!')

while True:
  event_manager.run()
  time.sleep_ms(1000)
