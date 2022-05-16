const app = new Vue({
    el: '#app',
  
    data: {
      annotations: [
        {
          id: 'annotation-1',
          title: 'Clothing is worn 7-8 times before it is thrown away',
          x: 23,
          y: 52,
        },
        {
            id: 'annotation-2',
            title: '80,000 pounds of NYC discarded garments find themselves in a warehouse in New Jersey per day.',
            x: 60,
            y: 30,
          },
      ],
  
    },
  
    mounted() {
  
      if (!this.annotations.length) {
        return;
      }
  
      // Enable popovers for predefined annotations.
      this.annotations.forEach(annotation => {
        this.initializePopover(annotation);
      });
    },
  
    methods: {
      onImageClick($event) {

  
        const rect = document.getElementById('annotated-image').getBoundingClientRect();
        const x = parseInt($event.clientX - rect.x, 10);
        const y = parseInt($event.clientY - rect.y, 10);

        rect.style.backgroundColor = "white";
  
        // Transform absolute coordinates to
        // percentage-based, so annotations will be
        // available if image size changes over time.
  
      },
  
  
      initializePopover(annotation) {
        $(`#${annotation.id}`).popover({
          title: annotation.title || 'Annotation Title',
          trigger: 'click',
        });
      },
    },
  });