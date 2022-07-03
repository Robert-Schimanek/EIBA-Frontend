<!-- This is copied code from the internet, which allows clean written 
dynamic events for dynamic components -->
<template>
  <div>
    <component
      :is="component"
      v-bind="dynamicProps"
      v-dynamic-events="knownEvents"
    ></component>
  </div>
</template>
<script>
import CoolComponent from "./cool-component.vue";

export default {
  directives: {
    DynamicEvents: {
      bind: function (el, binding, vnode) {
        const allEvents = binding.value;
        allEvents.forEach((event) => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, (eventData) => {
            // when the event is fired, the proxyEvent function is going to be called
            vnode.context.proxyEvent(event, eventData);
          });
        });
      },
      unbind: function (el, binding, vnode) {
        vnode.componentInstance.$off();
      },
    },
  },
  data() {
    return {
      component: CoolComponent,
      dynamicProps: {
        isThisCool: true,
      },
      knownEvents: ["event-1", "event-2"],
    };
  },
  methods: {
    proxyEvent(eventName, eventData) {
      // called by the custom directive
      // do whatever you please with the event :)
    },
  },
};
</script>