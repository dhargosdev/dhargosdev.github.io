// Original procedural soundtrack. Nothing is recorded or downloaded.
export class GardenAudio{
 constructor(){this.ctx=null;this.master=null;this.enabled=false;this.volume=.45;this.nextMusic=0;this.step=0;}
 async start(){try{if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return false;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=0;this.master.connect(this.ctx.destination);}await this.ctx.resume();this.setEnabled(true);return true}catch{return false}}
 setEnabled(on){this.enabled=on;if(this.ctx)this.master.gain.setTargetAtTime(on?this.volume*.45:0,this.ctx.currentTime,.12)}
 setVolume(v){this.volume=v;this.setEnabled(this.enabled)}
 tone(freq,duration=.8,delay=0,type='sine',gain=.13){if(!this.ctx||!this.enabled)return;const now=this.ctx.currentTime+delay;const osc=this.ctx.createOscillator(),envelope=this.ctx.createGain();osc.type=type;osc.frequency.value=freq;envelope.gain.setValueAtTime(.0001,now);envelope.gain.exponentialRampToValueAtTime(gain,now+.015);envelope.gain.exponentialRampToValueAtTime(.0001,now+duration);osc.connect(envelope).connect(this.master);osc.start(now);osc.stop(now+duration+.02);osc.onended=()=>{osc.disconnect();envelope.disconnect()};}
 bell(i){const f=[523.25,659.25,783.99][i];this.tone(f,1.8,0,'sine',.23);this.tone(f*2,1.1,0,'sine',.035)}
 sparkle(){[523.25,659.25,783.99,1046.5].forEach((f,i)=>this.tone(f,1.2,i*.12,'sine',.15))}
 water(){if(!this.ctx||!this.enabled)return;const duration=.5,buffer=this.ctx.createBuffer(1,this.ctx.sampleRate*duration,this.ctx.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/data.length);const src=this.ctx.createBufferSource(),filter=this.ctx.createBiquadFilter(),g=this.ctx.createGain();src.buffer=buffer;filter.type='lowpass';filter.frequency.value=1400;g.gain.value=.08;src.connect(filter).connect(g).connect(this.master);src.start();src.onended=()=>{src.disconnect();filter.disconnect();g.disconnect()}}
 pet(){this.tone(180,.3,0,'sine',.17);this.tone(230,.4,.18,'sine',.12)}
 tick(time,finished=false){if(!this.enabled||!this.ctx||this.ctx.state!=='running'||document.hidden||time<this.nextMusic)return;this.nextMusic=time+2.8;const notes=finished?[261.63,329.63,392,523.25,392,329.63]:[261.63,392,329.63,293.66,440,392,329.63,293.66];this.tone(notes[this.step%notes.length],3.8,0,'sine',.065);if(this.step%4===0)this.tone(130.81,7,0,'sine',.048);this.step++;}
}
